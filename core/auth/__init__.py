#!/usr/bin/env python3

import functools
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, render_template
)
from werkzeug.security import check_password_hash, generate_password_hash
from core.functions import (
    get_edit_query, get_exists_data, get_query, get_delete_query, get_new_query
)

auth = Blueprint('auth', __name__, url_prefix='/auth')

##### REquired LOGIN #####

def required_login(view):
    @functools.wraps(view)
    def wrapper_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(*args, **kwargs)
    return wrapper_view

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
        elif get_exists_data('id','user','username',(username,)) is not None:
            error = 'El Usuario {} ya esta registrado.'.format(username)

        if error is None:
            get_new_query(
                'user (username, password)', '(?, ?)',
                (username, generate_password_hash(password))
            )
            return redirect(url_for('auth.login'))

        flash(error)

    return render_template('auth/register.html')

@auth.route('/profile', methods = ('GET','POST'))
@required_login
def profile():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None

        if not username:
            error = 'Nombre de usuario requerido'
        elif not password:
            error = 'Contraseña requerida'
        elif get_exists_data('*','user','username',(username,)) is not None:
            error = 'El Usuario {} ya esta registrado.'.format(username)
        elif get_exists_data('*','user','password',(check_password_hash(password),)) is not None:
            error = 'La contraseña no es valida intenta nuevamente.'

        if error is None:
            get_edit_query(
                'user', 'username = ?, password = ?',
                'id',
                (username, password, g.user['id'])
            )
            return redirect(url_for('auth.profile'))

        flash(error)

    return render_template('auth/profile.html')

@auth.route('/login', methods = ('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None
        user = get_exists_data('*','user','username',(username,))

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