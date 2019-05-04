#!/usr/bin/env python3

import datetime
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, render_template
)
from werkzeug.exceptions import abort

from core.auth import required_login
from core.functions import (
    get_edit_query, get_exists_data, get_query, get_delete_query, get_new_query
    )

home = Blueprint('public', __name__, url_prefix = '/')


#### Building Routes #####

@home.route('/', methods = ('GET', 'POST'))
def index():
    update = request.args.get('update', None)
    if not update:
        update = None
    post = get_query(
        'p.id, title, body, created, author_id, username',
        'post p JOIN user u ON p.author_id = u.id',
        'DESC'
    )
    return render_template('public/home.html', posts = post, update = update)

@home.route('/create', methods = ('GET', 'POST'))
@required_login
def create():
    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None
        time = datetime.datetime.now()

        if not title:
            error = 'Titulo requerido'

        if error is not None:
            flash(error)
        else:
            get_new_query(
                'post (title, body, created, author_id)',
                '(?, ?, ?, ?)',
                (title, body, time, g.user['id'])
            )
            return redirect(url_for('public.index'))
    return render_template('public/create.html')

@home.route('/<int:id>/update', methods = ('GET','POST'))
@required_login
def update(id):
    post = get_exists_data(
        'p.id, title, body, created, author_id, username',
        'post p JOIN user u ON p.author_id = u.id',
        'p.id', (id,) )

    if post is None:
        abort(404, "Post id {0} no existe..".format(id))
    if post['author_id'] != g.user['id']:
        abort(403, "Post no es de este usuario : {0} acceso denegado".format(g.user['username']))

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None
        time = datetime.datetime.now()

        if not title:
            error = 'Titulo Requerido'

        if error is not None:
            flash(error)
        else:
            get_edit_query(
                'post', 'title = ?, body = ?, created = ?',
                'id',
                (title, body, time, id)
            )
            return redirect(url_for('public.index', update="Si"))

    return render_template('public/update.html', post=post)

@home.route('/<int:id>/delete', methods = ('GET', 'POST'))
@required_login
def delete(id):
    get_exists_data(
        'p.id, title, body, created, author_id, username',
        'post p JOIN user u ON p.author_id = u.id','p.id',
    (id,) )

    get_delete_query('post', (id,))

    return redirect(url_for('public.index'))