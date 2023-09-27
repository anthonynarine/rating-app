
from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

User = get_user_model()

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'is_active',)
    list_filter = ('username', 'email', 'is_active',)
    
    MAIN_FIELDSET = ("User Attributes", {'fields': ('username', 'email', 'password')})
    
    fieldsets = (
        MAIN_FIELDSET,
        # ... add other fieldsets if you have more fields
    )
    
    add_fieldsets = (
        ("User Attributes", {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )

admin.site.register(User, CustomUserAdmin)


""" Tuple Structure:
The first element of the tuple (User Attibutes in this case) typically defines the
title of the fieldset section in the Django admin form. When it's set to
User Attibutes, it means that this section won't have a title.

The second element is a dictionary that provides more specific 
configurations for the fieldset.

Dictionary Structure:
The key 'fields' corresponds to a tuple of field names that should be displayed
in this fieldset. Here, it's set to the fields 'username', 'email', and 'password'.
How It Works:
When you use this structure within the Django admin site, Django interprets
it as a guideline for how to organize and display fields in the admin form. 
Specifically, the fields 'username', 'email', and 'password' will be grouped
together in a section that has no title.

How to Access:
Being a tuple, you can use indexing to access its elements. Here's how you'd
do that:

MAIN_FIELDSET[0] will give you the first element, which is User 
Attibutes.

MAIN_FIELDSET[1] will give you the dictionary.

To further access elements within the dictionary:

MAIN_FIELDSET[1]['fields'] will give you the tuple 
('username', 'email', 'password').
Similarly, to get the individual fields:

MAIN_FIELDSET[1]['fields'][0] will give you 'username'.
MAIN_FIELDSET[1]['fields'][1] will give you 'email'.
MAIN_FIELDSET[1]['fields'][2] will give you 'password'.
That's a basic overview of this data structure and how it's
used and accessed. In practice, this configuration lets Django 
know how to structure the fields in the admin interface form for
better user experience and organization."""