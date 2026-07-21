"""
WSGI config for the prepro_tracker project.

Exposes the WSGI callable as a module-level variable named ``application``,
matching the target referenced by the Dockerfile's gunicorn CMD
(prepro_tracker.wsgi:application).
"""
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'prepro_tracker.settings')

application = get_wsgi_application()
