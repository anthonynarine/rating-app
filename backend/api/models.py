from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from .validators import validate_icon_image_size, validate_image_file_extension
from .utils import scale_image
from django.conf import settings


def movie_icon_upload_path(instance, filename):
    return f"movie/{instance.title}/movie_icon/{filename}"


def movie_banner_upload_path(instance, filename):
    return f"movie/{instance.title}/movie_banner/{filename}"


def default_icon_image():
    return "movie/default/film.png"


class Rating(models.Model):
    movie = models.ForeignKey("Movie", on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    stars = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (("user", "movie"),)

    def __str__(self):
        return f"{self.stars} Stars  -->  {self.movie}"


class Movie(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=360)
    icon = models.FileField(
        upload_to=movie_icon_upload_path,
        null=True,
        blank=True,
        default=default_icon_image,
        validators=[validate_image_file_extension],
    )
    banner_img = models.ImageField(
        upload_to=movie_banner_upload_path,
        null=True,
        blank=True,
        validators=[validate_image_file_extension],
    )

    def save(self, *args, **kwargs):
        """
        Override the save method to delete the previous icon if it's being updated.

        This method is called when saving a Movie instance. It checks if the instance
        already has an ID (indicating an existing record), then compares the existing
        icon with the new one. If they're different, it deletes the existing icon
        and calls the parent class's save method to save the new instance.

        Args:
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            None
        """
        if self.id:
            existing = get_object_or_404(Movie, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)
            if existing.banner_img != self.banner_img:
                existing.banner_img.delete(save=False)

        if self.icon and self.icon.path:
            try:
                # Scale down the icon image to 70x70 pixels
                scale_image(self.icon.path)
            except Exception as e:
                print(f"Error scaling image: {e}")

        super(Movie, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="api.Movie")
    def delete_movie_files(sender, instance, **kwargs):
        if instance.icon:
            instance.icon.delete(save=False)

    def num_of_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        return len(ratings)

    def avg_rating(self):
        sum = 0
        ratings = Rating.objects.filter(movie=self)
        for rating in ratings:
            sum += rating.stars
        if len(ratings) > 0:
            return sum / len(ratings)
        else:
            return 0

    def __str__(self):
        return self.title
