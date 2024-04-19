FROM python:alpine
WORKDIR /backend
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apk update

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt
# copy project
COPY . .
RUN python manage.py makemigrations && python manage.py migrate
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000", "&"]