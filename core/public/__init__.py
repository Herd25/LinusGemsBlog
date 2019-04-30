#!/usr/bin/env python3

import json
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, render_template
)
from werkzeug.exceptions import abort

from core.auth import required_login
from core.database import get_db

home = Blueprint('public', __name__, url_prefix = '/')

@home.route('/')
def index():
    #db = get_db()
    #post = db.execute(
    #    'SELECT p.id, title, body, created, author_id, username'
    #    ' FROM post p JOIN user u ON p.author_id = u.id'
    #    ' ORDER BY created DESC'
    #).fetchall()
    #post = json.dumps({'title' : 'HolaMundo', 'username' : 'alex', 'created' : '25-10-2018'})
    
    return render_template('public/home.html')

@home.route('/create', methods = ('GET', 'POST'))
@required_login
def create():
    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Titulo requerido'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'INSERT INTO post (title, body, author_id)'
                ' VALUES (?, ?, ?)',
                (title, body, g.user['id'])
            )
            db.commit()
            return redirect(url_for('public.index'))
    return render_template('public/create.html')