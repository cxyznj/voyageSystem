#!/bin/sh

python manage.py migrate --noinput

# gunicorn mainapp.wsgi:application --bind 0.0.0.0:8000
# python manage.py runserver
exec "$@"