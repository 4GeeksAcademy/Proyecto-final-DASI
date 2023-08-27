"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
#from flask import Flask, request, jsonify, url_for, Blueprint
#from api.models import db, User
#from api.utils import generate_sitemap, APIException
#
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
#from utils import APIException, generate_sitemap
# from admin import setup_admin
from api.models import db, User, ProductoNombre,Producto,PerfilProductor
#from models import Person
#for authentication
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
#for checking email
import re

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# probando acceso a bd
@api.route('/users', methods=['GET'])
def get_all_users():

    users_query = User.query.all()
    results = list(map(lambda item: item.serialize(), users_query))

    response_body = {
       "results": results
    }

    return jsonify(response_body), 200
#crear productoNombre
@api.route('/producto', methods=['POST'])
def save_products():

    request_body = request.get_json(force=True)
    for x in request_body:
        item = ProductoNombre(nombre= x['nombre'])
        db.session.add(item)
    
    db.session.commit()


    response_body = {
        'msg':'ok',
        "results": ['Nombre de producto Created', item.serialize()]
    }

    return jsonify(response_body), 200

#get lista de productoNombre
@api.route('/producto', methods=['Get'])
def get_all_products():

    productos_query = Producto.query.all()
    results = list(map(lambda item: item.serialize(), productos_query))

    response_body = {
       "results": results
    }

    return jsonify(response_body), 200

# #get lista de Comunidades Autonomas
# @api.route('/ca', methods=['Get'])
# def get_all_ca():

#     ca_query = ComunidadAutonoma.query.all()
#     results = list(map(lambda item: item.serialize(), ca_query))

#     response_body = {
#        "results": results
#     }

#     return jsonify(response_body), 200

# #post lista de Comunidades Autonomas
# @api.route('/ca', methods=['POST'])
# def add_ca():

#     request_body = request.get_json(force=True)

#     for x in request_body:
#         item = ComunidadAutonoma(name= x['name'])
#         db.session.add(item)

#     db.session.commit()


#     response_body = {
#         'msg':'ok',
#         "results": ['CA Created', item.serialize()]
#     }

#     return jsonify(response_body), 200

# #get lista de Provincias
# @api.route('/provincias', methods=['Get'])
# def get_all_provincias():

#     provincia_query = Provincia.query.all()
#     results = list(map(lambda item: item.serialize(), provincia_query))

#     response_body = {
#        "results": results
#     }

#     return jsonify(response_body), 200

# #post lista de Provincias
# @api.route('/provincias', methods=['POST'])
# def add_provincia():

#     request_body = request.get_json(force=True)

#     for x in request_body:
#         item = Provincia(name= x['name'],
#                         comunidad_autonoma_id= x['comunidad_autonoma_id'])
#         print(item)
#         db.session.add(item)

#     db.session.commit()


#     response_body = {
#         'msg':'ok',
#         "results": ['Provincia Created', item.serialize()]
#     }

#     return jsonify(response_body), 200


# crear usuario
@api.route('/registro', methods=['POST'])
def add_user():

    request_body = request.get_json(force=True)

    #add validation
    atributos = ["username","password","email"]
    
    for x in atributos:
        if x not in request_body:
            response = f'You need to specify the {x}', 400
            return response
    #if 'nombre' not in body:
    #    raise APIException('You need to specify the nombre', status_code=400)


    usuario = User(username= request_body['username'],
                   password= request_body['password'],
                   email= request_body['email']
                   
                   
                   )
    print(usuario)

    db.session.add(usuario)
    db.session.commit()


    response_body = {
        'msg':'ok',
        "results": ['Usuario Created', usuario.serialize()]
    }

    return jsonify(response_body), 200

# sample post to create favoritos
# {
#     "characters_id": null,
#     "planets_id":1
    
# }
#sample response
# {
#     "msg": "ok",
#     "results": [
#         "Favorito Created",
#         {
#             "characters": null,
#             "id": 7,
#             "planets": "Planeta de los simios",
#             "user_id": 1
#         }
#     ]
# }
# USERS

@api.route('/users', methods=['POST'])



def create_user():

    request_body = request.get_json(force=True)

    user = User(email=request_body['email'],
                password=request_body['password'],
                is_active=request_body['is_active'])
    
    if request_body['email'] is None or request_body['password'] is None or request_body['is_active'] is None:
        return jsonify ({
            'msg':'missing parameters (email, password, is_active are required)'
        }), 400
    
    # Verificamos email válido (basico)

    # if "@" not in request_body['email'] or "." not in request_body['email']:
    #     return jsonify ({
    #         'msg':'wrong email format(check @ .)'
    #     }), 400

    # Verificamos email válido (pro)
    def validar_email(email):
        # Patrón de expresión regular para validar el email
        patron_email = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        
        # Usamos re.match() para verificar el patrón en el email proporcionado
        if re.match(patron_email, email):
            return True
        else:
            return False



    # Ejemplo de uso:

    # email_ejemplo = "usuario@example.com"
    if validar_email(request_body['email']):
        print("El email es válido.")
    else:
        return jsonify ({
            'msg':'wrong email format(check @ .)'
        }), 400

    db.session.add(user)
    db.session.commit()


    response_body = {
       "results": 'User Created'
    }

    return jsonify(response_body), 200


# -------------------- PERFIL PRODUCTOR --------------------

# @api.route('/perfil_productor', methods=['Post'])
# def get_all_productores():
#     request_body = request.get_json(force=True)

#     Productor_query = PerfilProductor.query

#     if (request_body['selectedOptions'] != {} and request_body['selectedOptions']['Producto'] != None):
#         Productor_query.filter(PerfilProductor.producto.any(nombre=request_body['selectedOptions']['Producto'] ))
#     if (request_body['selectedCommunity'] != {} and request_body['selectedCommunity']['PerfilProductor'] != None):
#         Productor_query.filter(PerfilProductor.any(comunidad_autonoma_id=request_body['selectedCommunity']['PerfilProductor'] ))

#     results = list(map(lambda item: item.serialize(), Productor_query))

#     response_body = {
#        "results": results
#     }

#     return jsonify(response_body), 200

@api.route('/perfil_productor', methods=['POST'])
def get_all_productores():
    request_body = request.get_json(force=True)

    Productor_query = PerfilProductor.query

    if request_body['selectedOptions'] and request_body['selectedOptions']['Producto']:
        product_name = request_body['selectedOptions']['Producto']
        Productor_query = Productor_query.filter(PerfilProductor.producto.any(nombre=product_name))

    if request_body['selectedCommunity'] and request_body['selectedCommunity']:
        community_name = request_body['selectedCommunity']
        Productor_query = Productor_query.filter(PerfilProductor.comunidad_autonoma_id == community_name)
    
    if request_body['selectedProvince'] and request_body['selectedProvince']:
        province_name = request_body['selectedProvince']
        Productor_query = Productor_query.filter(PerfilProductor.provincia_id == province_name)

    results = list(map(lambda item: item.serialize(), Productor_query))

    response_body = {
        "results": results
    }

    return jsonify(response_body), 200




# -------------------- CREAR PERFIL PRODUCTOR --------------------

@api.route('/perfil_productor', methods=['POST'])
def add_productor():

    request_body = request.get_json(force=True)

    productor = PerfilProductor(
        nombre= request_body['nombre'],
        apellido= request_body['apellido'],
        direccion= request_body['direccion'],
        telefono= request_body['telefono'],
        codigo_postal= request_body['codigo_postal'],
        comunidad_autonoma_id= request_body['comunidad_autonoma_id'],
        provincia_id= request_body['provincia_id'],
        nombre_huerta= request_body['nombre_huerta'],     
        problemas= request_body['problemas'],
        donde_encontrar= request_body['donde_encontrar']
          )
    
    db.session.add(productor)
    db.session.commit()


    response_body = {
        'msg':'ok',
        "results": ['Productor Created', productor.serialize()]
    }

    return jsonify(response_body), 200

# -------------------- LOGIN --------------------

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "email do not exist"}), 404

    if password != user.password:
        return jsonify({"msg": "Bad password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# -------------------- PROFILE --------------------

@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if user is None:
        return jsonify({"msg": "user do not exist"}), 404
    return jsonify(logged_in_as=current_user), 200

