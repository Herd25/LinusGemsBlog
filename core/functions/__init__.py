#!/usr/bin/env python3

from core.database import get_db

### Make Functionalitys from queries ##

def get_query(TYPE,TABLE,ORDER):
    db = get_db()
    rows = db.execute('SELECT {0} FROM {1} ORDER BY created {2}'.format(TYPE,TABLE,ORDER)).fetchall()

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