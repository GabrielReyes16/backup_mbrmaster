from django.contrib import admin
from .models import users, Profile

# Register your models here.
class UserMBR(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileMBR(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified']


admin.site.register(users, UserMBR)
admin.site.register(Profile, ProfileMBR


)
