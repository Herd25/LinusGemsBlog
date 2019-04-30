#!/usr/bin/env python3

import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, render_template
)
from werkzeug.security import check_password_hash, generate_password_hash
from core.functions import get_edit_query, get_exists_data, get_query, get_delete_query

auth = Blueprint('auth', __name__, url_prefix='/auth')

##### REquired LOGIN #####

def required_login(view):
    @functools.wraps(view)
    def wrapper_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(*args, **kwargs)
    return wrapper_view

#### Required Auth #####

@auth.before_request
def load_logget_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_exists_data('SELECT * FROM user WHERE id = ?',(user_id,))


#### Building Routes #####

@auth.route('/register', methods = ('GET','POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None

        if not username:
            error = 'Nombre de usuario requerido'
        elif not password:
            error = 'Contraseña requerida'
        elif get_exists_data('SELECT id FROM user WHERE username = ?',(username,)) is not None:
            error = 'El Usuario {} ya esta registrado.'.format(username)

        if error is None:
            get_edit_query(
                'INSERT INTO user (username, password) VALUES (?, ?)',
                (username, generate_password_hash(password))
            )
            return redirect(url_for('auth.login'))

        flash(error)

    return render_template('auth/register.html')

@auth.route('/login', methods = ('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None
        user = get_exists_data('SELECT * FROM user WHERE username = ?',(username,))

        if user is None:
            error = 'Usuario incorrecto.'
        elif not check_password_hash(user['password'], password):
            error = 'Contraseña incorrecta.'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('public.index'))

        flash(error)

    return render_template('auth/login.html')

@auth.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('public.index'))