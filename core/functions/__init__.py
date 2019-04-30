#!/usr/bin/env python3

from core.database import get_db

### Make Functionalitys from queries ##

def get_query(COMM):
    db = get_db()
    rows = db.execute(COMM).fetchall()

    return rows

def get_edit_query(COMM,VAL):
    db = get_db()
    db.execute(COMM,VAL)
    db.commit()

def get_delete_query(COMM, VAL):
    db = get_db()
    db.execute(COMM, VAL)

def get_exists_data(COMM,VAL):
    db = get_db()
    result = db.execute(COMM,VAL).fetchone()

    return result