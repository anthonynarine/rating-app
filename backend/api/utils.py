from PIL import Image

def scale_image(image_path, target_size=(70, 70)):
    """
    Scales down an image to the specified target size using Pillow.

    Args:
        image_path (str): Path to the image file.
        target_size (tuple): Target dimensions (width, height) for the scaled image.

    Returns:
        None
    """
    img = Image.open(image_path)
    img.thumbnail(target_size)
    img.save(image_path)
