#!/usr/bin/env python3

from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, render_template
)
from werkzeug.exceptions import abort

from core.auth import required_login
from core.functions import get_edit_query, get_exists_data, get_query, get_delete_query

home = Blueprint('public', __name__, url_prefix = '/')

#### Required Auth #####

@home.before_request
def load_logget_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_exists_data('SELECT * FROM user WHERE id = ?',(user_id,))

#### Building Routes #####

@home.route('/')
def index():
    post = get_query(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' ORDER BY created DESC'
    )
    return render_template('public/home.html', posts = post)

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
            get_edit_query(
                'INSERT INTO post (title, body, author_id)'
                ' VALUES (?, ?, ?)',
                (title, body, g.user['id'])
            )
            return redirect(url_for('public.index'))
    return render_template('public/create.html')

@home.route('/<int:id>/update', methods = ('GET','POST'))
@required_login
def update(id):
    post = get_exists_data(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' WHERE p.id = ?',
        (id,)
    )

    if post is None:
        abort(404, "Post id {0} no existe..".format(id))
    if post['author_id'] != g.user['id']:
        abort(403, "Post no es de este usuario : {0} acceso denegado".format(g.user['username']))

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Titulo Requerido'

        if error is not None:
            flash(error)
        else:
            get_edit_query(
                'UPDATE post SET title = ?, body = ?'
                ' WHERE id = ?',
                (title, body, id)
            )
            return redirect(url_for('public.index'))

    return render_template('public/update.html', post=post)

@home.route('/<int:id>/delete', methods = ('GET', 'POST'))
@required_login
def delete(id):
    get_exists_data(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' WHERE p.id = ?',
        (id,)
    )
    get_delete_query('DELETE FROM post WHERE id = ?', (id,))

    return redirect(url_for('public.index'))