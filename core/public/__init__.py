#!/usr/bin/env python3

import datetime
import time
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, render_template, Response
)
from werkzeug.exceptions import abort

from core.auth import required_login
from core.functions import (
    get_edit_query, get_exists_data, get_query, get_delete_query, get_new_query, create_plot, save_image
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
        'created DESC'
    )
    return render_template('public/home.html', posts = post, update = update)

@home.route('/<int:id>/article', methods = ('GET', 'POST'))
def articles(id):
    comments = get_query(
        'c.id, comment, user_id, username',
        'comments c JOIN user u ON c.user_id = u.id',
        'c.id'
    )
    post = get_exists_data(
        'p.id, title, body, created, author_id, username',
        'post p JOIN user u ON p.author_id = u.id',
        'p.id', (id,) )
    return render_template('public/article.html', article = post, commentaries = comments)

### USER COMMENTS ####
@home.route('/comments', methods = ('GET', 'POST'))
def comments():
    if request.method == 'POST':
        post = request.form['postid']
        username = request.form['username']
        comment = request.form['comentary']
        error = None

        if not comment:
            error = 'No se ha escrito el coemntario'

        if error is not None:
            flash(error)
        else:
            get_new_query(
                'comments (comment, user_id, post_id)',
                '(?, ?, ?)',
                (comment, username, post)
            )

    return redirect(url_for('public.articles', id=post))

### CONTROLLER TIME ####

@home.route('/time_feed')
def time_feed():
    def generate():
            yield datetime.datetime.now().strftime("%H:%M:%S")
            time.sleep(1)
    return Response(generate(), mimetype='text/plain')

#### USER CREATOR ROUTES ####

@home.route('/create', methods = ('GET', 'POST'))
@required_login
def create():
    if request.method == 'POST':
        title = request.form['title']
        body = request.form['TextContentEditor']
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
    return render_template('public/creator.html', directory="CreatePost")

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
        body = request.form['TextUpdateContentEditor']
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

    return render_template('public/creator.html', directory="UpdatePost", post=post)

@home.route('/<int:id>/delete', methods = ('GET', 'POST'))
@required_login
def delete(id):
    get_exists_data(
        'p.id, title, body, created, author_id, username',
        'post p JOIN user u ON p.author_id = u.id','p.id',
    (id,) )

    get_delete_query('post', (id,))

    return redirect(url_for('public.index'))

#### USER DATA PAGE ####

@home.route('/profile', methods = ('GET','POST'))
@required_login
def profile():
    bar = create_plot()
    post = get_query(
        'p.id, title, body, created, author_id, username',
        'post p JOIN user u ON p.author_id = u.id',
        'created DESC'
    )
    comments = get_query(
        'c.id, comment, user_id, username, post_id, title',
        'comments c JOIN user u ON c.user_id = u.id JOIN post p ON c.post_id = p.id',
        'c.id'
    )
    avatar = get_query(
        'i.id, image, user_id',
        'avatar i JOIN user u ON i.user_id = u.id',
        'i.id'
    )

    return render_template('public/profile.html', plot=bar, myposts=post, comments =  comments, image = avatar)

## Add updates profile ##
@home.route('/update&username', methods = ('GET','POST'))
@required_login
def update_username():
    if request.method == 'POST':
        username = request.form['username']
        error = None

        if not username:
            error = 'El nombre de usuario esta vacio'
            category = 'material-yellow'
        elif get_exists_data('id','user','username',(username,)) is not None:
            error = 'El nombre de usuario ya existe escoje uno diferente'
            category = 'material-red'

        if error is None:
            get_edit_query(
                'user', 'username = ?',
                'id',
                (username, g.user.id)
            )
        flash(error, category)
    return redirect(url_for('public.profile'))

@home.route('/update&about', methods = ('GET','POST'))
@required_login
def update_about():
    if request.method == 'POST':
        about = request.form['about']
        error = None

        if not about:
            error = 'El campo esta vacio'
            category = 'material-yellow'

        if error is None:
            get_edit_query(
                'user', 'bibliography = ?',
                'id',
                (about, g.user.id)
            )
        flash(error, category)
    return redirect(url_for('public.profile'))

### Add Profile new Values ###
@home.route('/update&avatar', methods = ('GET', 'POST'))
@required_login
def update_avatar():
    if request.method == 'POST':
        error = None
        if 'file' not in request.files:
            error = 'Hubo un error interno al procesar'
            category = 'material-yellow'
        image = request.file['avatar']

        if not image.filename:
            error = 'No se ha guardado hubo un error al cargar revisa tu conexion'
            category = 'material-red'

        if error is None:
            save_image(image)
            get_edit_query(
                'avatar', 'image = ?',
                'id',
                (image.filename, g.user.id)
            )
        flash(error, category)
    return redirect(url_for('public.profile'))

## Social Feed ##
@home.route('/social&feed', methods = ('GET', 'POST'))
@required_login
def social_feed():
    if request.method == 'POST':
        social = request.form['socialname']
        url = request.form['socialurl']
        error = None

        if not social:
            error = 'El campo no puede estar vacio especifica un nombre'
            category = 'material-yellow'
        elif not url:
            error = 'El campo no puede estar vacio especifica un nombre'
            category = 'material-red'

        if error is None:
            if get_exists_data('id', 'socialfeed', 'feed', (social,)) is not None:
                flash('Ya existe Actualizando', 'material-teal')
                get_edit_query(
                    'socialfeed', 'url = ?',
                    'feed',
                    (url, social)
                )
            else:
                flash('Añadiendo la red a tu estatus', 'material-blue')
                get_new_query(
                    'socialfeed (feed, url, user_id)',
                    '(?, ?, ?)',
                    (social, url, g.user['id'])
                )
        flash(error, category)
    return redirect(url_for('public.profile'))
