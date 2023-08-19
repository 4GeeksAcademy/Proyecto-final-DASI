from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Table, delete, select,Float

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(20), unique=False, nullable=False)
    apellido = db.Column(db.String(50), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    direccion = db.Column(db.String(120), unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=True, nullable=False)
    codigo_postal = db.Column(db.Integer, unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    #funcionaba en otro repo de diagrama
    comunidad_autonoma_id = db.Column(db.Integer, db.ForeignKey('comunidades_autonomas.id'),nullable=False)
    provincia_id = db.Column(db.Integer, db.ForeignKey('provincias.id'),nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email
            # do not serialize the password, its a security breach
        }

class ComunidadAutonoma(db.Model):
    __tablename__ = 'comunidades_autonomas'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    user = db.relationship('User', backref='comunidades_autonomas', lazy=True)
    provincia = db.relationship('Provincia', backref='comunidades_autonomas', lazy=True)
    
    #user = db.relationship('User', backref='comunidades_autonomas', lazy=True)
    #provincia = db.relationship('Provincia', backref='comunidades_autonomas', lazy=True)
    
   
    def __repr__(self):
        return '<ComunidadAutonoma %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
            # do not serialize the password, its a security breach
        }

class Provincia(db.Model):
    __tablename__ = 'provincias'
    # Here we define columns for the table address.
    # Notice that each column is also a normal Python instance attribute.
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    user = db.relationship('User', backref='provincias', lazy=True)
    comunidad_autonoma_id = db.Column(db.Integer, db.ForeignKey('comunidades_autonomas.id'),nullable=False)
    #funcionaba
    #comunidad_autonoma_id = db.Column(db.Integer, db.ForeignKey('comunidades_autonomas.id'),nullable=False)
    #comunidad_autonoma  = db.relationship('ComunidadAutonoma', backref='provincias', lazy=True)
    

    
   
    def __repr__(self):
        return '<Provincia %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "CA": self.comunidad_autonoma_id
            # do not serialize the password, its a security breach
        }