#!/usr/bin/env python3

import os
from flask import Flask, session, g, send_from_directory
from flask_mail import Mail, Message
from core.functions import get_exists_data

def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY = 'dev',
        DATABASE = os.path.join(app.instance_path,'db.sqlite'),
        UPLOAD_FOLDER = os.path.dirname(os.path.join(os.path.dirname(__file__), 'static', 'avatar'))
    )

    if test_config is None:
        if app.config["ENV"] == 'production':
            app.config.from_object('config.PRODUCTION')
        elif app.config["ENV"] == 'testing':
            app.config.from_object('config.TESTING')
        else:
            app.config.from_object('config.DEVELOP')
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    #### Building Globals Request ######

    @app.before_request
    def load_logget_user():
        user_id = session.get('user_id')

        if user_id is None:
            g.user = None
        else:
            g.user = get_exists_data('*','user','id',(user_id,))

    @app.route('/send-mail')
    def send_mail():
        try:
            msg = Message("Enviando un Mensaje por Gmail",
                sender="admin@linusgems.com",
                recipients=["ruxexofoxi@simpleemail.info"])
            msg.body = 'Mi mensaje de bienvenida'
            mail.send(msg)
            return 'Correo Enviado!'
        except Exception as E:
            return str(E)

    @app.route('/js/<path:file>')
    def send_js(file):
        root_dir = os.path.dirname(os.getcwd())
        return send_from_directory(os.path.join(root_dir, 'static', 'js'), file)

    from .database import init_app
    from .auth import auth
    from .public import home

    init_app(app)
    mail = Mail(app)
    app.register_blueprint(auth)
    app.register_blueprint(home)

    return app