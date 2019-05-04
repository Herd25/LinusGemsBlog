#!/usr/bin/env python3

import os
from flask import Flask, session, g
from core.functions import get_exists_data

def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY = 'dev',
        DATABASE = os.path.join(app.instance_path,'db.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent = True)
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

    @app.route('/hello')
    def hello():
        return 'Hello World'

    from .database import init_app
    from .auth import auth
    from .public import home

    init_app(app)
    app.register_blueprint(auth)
    app.register_blueprint(home)

    return app