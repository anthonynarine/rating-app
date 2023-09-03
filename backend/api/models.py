from tkinter import SEL_FIRST
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Movie(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=360)
    
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

        

class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (("user", "movie"),)

    class Meta:
        unique_together = (("user", "movie"),)
        
        
    def __str__(self):
            return f"{self.stars} Stars  -->  {self.movie}"