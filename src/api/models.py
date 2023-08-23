from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Table, delete, select,Float

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
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
    #one2one relationship with perfil_productor
    productor = db.relationship("PerfilProductor", uselist=False,back_populates="user")
    #child = relationship("Child", uselist=False, back_populates="parent")
    #favoritos = db.relationship('favoritos_productores', backref='user', lazy=True)
    #fin de one2one relationship with user

    def __repr__(self):
        return f"<User {self.email}>"

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
        return '<ComunidadAutonoma %r>' % self.name

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
        return '<Provincia %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "CA": self.comunidad_autonoma_id
            # do not serialize the password, its a security breach
        }
    
class PerfilProductor(db.Model):
    __tablename__ = 'perfil_productores'
    # Here we define columns for the table address.
    # Notice that each column is also a normal Python instance attribute.
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    producto = db.relationship('Producto', backref='perfil_productores', lazy=True)
    #user = db.relationship('User', backref='comunidades_autonomas', lazy=True)

    #one2one relationship with user
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates="productor")
    #parent_id = mapped_column(ForeignKey("parent_table.id"))
    #parent = relationship("Parent", back_populates="child")
    #fin de one2one relationship with user

    nombre_huerta = db.Column(db.String(250), nullable=True)
    foto_portada = db.Column(db.String(250), nullable=True)
    foto_perfil = db.Column(db.String(250), nullable=True)
    problemas = db.Column(db.String(250), nullable=True)
    donde_encontrar = db.Column(db.String(250), nullable=True)
    latitud = db.Column(db.Float, nullable=True)
    longitud = db.Column(db.Float, nullable=True)
    # relationship with favorito
    #favoritos = db.relationship('favoritos_productores', backref='perfil_productores', lazy=True)

    def __repr__(self):
        return '<PerfilProductor %r>' % self.nombre_huerta
 

    def serialize(self):
        return {
            "id": self.id,
            "nombre_huerta": self.nombre_huerta,
            "latitud": self.latitud,
            "longitud": self.longitud
            # do not serialize the password, its a security breach
        }

class Producto(db.Model):
    __tablename__ = 'productos'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    productor_id = db.Column(db.Integer, db.ForeignKey('perfil_productores.id'),nullable=False)
    #comunidad_autonoma_id = db.Column(db.Integer, db.ForeignKey('comunidades_autonomas.id'),nullable=False)
    nombre = db.Column(db.String(250), nullable=True)
    variedad = db.Column(db.String(250), nullable=True)
    cantidad = db.Column(db.Integer, nullable=True)
    unidad_medida = db.Column(db.String(250), nullable=True)
    precio = db.Column(db.Float, nullable=True)
  

    def __repr__(self):
        return '<Producto %r>' % self.nombre

class ProductoNombre(db.Model):
    __tablename__ = 'productoNombres'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    nombre = db.Column(db.String(250), nullable=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre
        }
  

    def __repr__(self):
        return '<ProductoNombre %r>' % self.nombre      

# class FavoritoProductor(db.Model):
#     __tablename__ = 'favoritos_productores'
#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
#     productor_id = db.Column(db.Integer, db.ForeignKey('perfil_productores.id'),nullable=False)
    
    
  

#     def to_dict(self):
#         return {}   

