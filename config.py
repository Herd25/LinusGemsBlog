#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

class Init(object):
    DEBUG = True
    TESTING = False
    APP_ROOT = os.path.dirname(os.path.abspath(__file__))
    SECRET_KEY = os.urandom(16)
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_DEBUG = False
    MAIL_USERNAME = os.environ.get(EMAIL_USER)
    MAIL_PASSWORD = os.environ.get(EMAIL_PASS)
    MAIL_DEFAULT_SENDER = '@Linusgems'
    MAIL_MAX_EMAILS = None
    MAIL_SUPPRES_SEND = False
    MAIL_ASCII_ATTACHMENTS = False

class DEVELOP(Init):
    DATABASE = 'sqilte3://:memory:'

class PRODUCTION(Init):
    pass

config = {
    'Develop' : DEVELOP,
    'Deploy' : PRODUCTION
}