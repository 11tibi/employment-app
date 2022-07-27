# Employment web application

---

Employment web application built with Django, React, and 
MaterialUI. The application is similar to web apps like 
indeed and eJobs.

# Setup

---

Clone the repository.

From <code>api</code> folder run:

```
python -m venv env 
env/Scripts/activate
pip install -r requirements.txt
```

Edit <code>db.cnf</code> file with your database credentials.

```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

From <code>frontend</code> folder run:

```
npm i
npm start
```

