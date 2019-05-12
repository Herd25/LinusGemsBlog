#!/usr/bin/env python3

import os
import plotly
import plotly.graph_objs as go
import pandas as pd
import numpy as np
import json
from flask import current_app, g, send_from_directory
from werkzeug.utils import secure_filename
from core.database import get_db

### Make Functionalitys from queries ##

def get_query(TYPE,TABLE,ORDER):
    db = get_db()
    rows = db.execute('SELECT {0} FROM {1} ORDER BY {2}'.format(TYPE,TABLE,ORDER)).fetchall()

    return rows

def get_new_query(TABLECOLUMN,QUANTITY,VAL):
    db = get_db()
    db.execute('INSERT INTO {0} VALUES {1}'.format(TABLECOLUMN, QUANTITY),VAL)
    db.commit()

def get_edit_query(TABLE,COLUMN,ID,VAL):
    db = get_db()
    db.execute('UPDATE {0} SET {1} WHERE {2} = ?'.format(TABLE,COLUMN,ID),VAL)
    db.commit()

def get_delete_query(TABLE, VAL):
    db = get_db()
    db.execute('DELETE FROM {0} WHERE id = ?'.format(TABLE), VAL)
    db.commit()

def get_exists_data(TIPE,TABLE,KEY,VAL):
    db = get_db()
    result = db.execute('SELECT {0} FROM {1} WHERE {2} = ?'.format(TIPE,TABLE,KEY),VAL).fetchone()

    return result

### Create Data Analistyc ####

def create_plot():
    N = 40
    x = np.linspace(0,1,N)
    y = np.random.randn(N)
    df = pd.DataFrame({ 'x' : x, 'y' : y })

    data = [
        go.Bar(
            x = df['x'],
            y = df['y']
        )
    ]

    graphJsonData = json.dumps(data, cls = plotly.utils.PlotlyJSONEncoder)

    return graphJsonData

### Recibe Profiles Image Data ####

def save_image(filename):
    if filename and allowed_file(filename.filename):
        file = secure_filename(filename.filename)
        directory = os.path.join(current_app.config['UPLOAD_FOLDER'], 'avatar', file)
        filename.save(directory)
        return 'File Save'

def allowed_file(filename):
    Extension = set(['png', 'jpg', 'gif'])
    return '.' in filename and filename.rsplit('.',1)[1].lower() in Extension
