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
from api.models import db, User, ProductoNombre,Producto,PerfilProductor,Pedido
#from models import Person
#for authentication
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
#for checking email
import re
#for geocode /#Importing the Nominatim geocoder class 
from geopy.geocoders import Nominatim

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


# -------------------- CREAR PRODUCTO --------------------

@api.route('/producto', methods=['POST'])
def add_producto():

    request_body = request.get_json(force=True)

    producto = Producto(
        nombre= request_body ['nombre'],
        cantidad= request_body['cantidad'],
        unidad_medida= request_body['unidad_medida'],
        variedad= request_body['variedad'],
        tipo_produccion= request_body['tipo_produccion'],
        recogida= request_body['recogida'],
        precio= request_body['precio'],
        productor_id= request_body['productor_id']
    )
    
    db.session.add(producto)
    db.session.commit()


    response_body = {
        'msg':'ok',
        "result": {'Producto Created': producto.serialize()}
    }

    return jsonify(response_body), 200


# -------------------- ELIMINAR PRODUCTO --------------------

@api.route('/producto/<int:id>', methods=['DELETE'])
def del_producto(id):
 

    producto_query= Producto.query.filter_by(id=id).first()
    
    if producto_query is None:
        return jsonify({"msg": "the product does not exist"})

    db.session.delete(producto_query)
    db.session.commit()


    response_body = {
        'msg':'ok',
        "results": 'Product deleted'
    }
    
    
    return jsonify(response_body), 200

# -------------------- EDITAR PRODUCTO --------------------

@api.route('/producto/<int:id>', methods=['PUT'])
def edit_product(id):

    body = request.get_json(force=True) #{ 'username': 'new_username'}

    product1 = Producto.query.get(id)
    product1.nombre = body["nombre"]
    product1.variedad = body["variedad"]
    product1.cantidad = body["cantidad"]
    product1.unidad_medida = body["unidad_medida"]
    product1.precio = body["precio"]
    product1.recogida = body["recogida"]
    product1.tipo_produccion = body["tipo_produccion"]

    db.session.commit()

    if product1.nombre is None:
        return jsonify({"msg": "the product does not exist"})

    return jsonify(product1.serialize()), 200

    

#get lista de productoNombre
@api.route('/producto', methods=['Get'])
def get_all_products():

    productos_query = Producto.query.all()
    results = list(map(lambda item: item.serialize(), productos_query))

    response_body = {
       "results": results
    }

    return jsonify(response_body), 200

# get lista de Productos by ID de Productor
@api.route('/producto_by_productor/<int:id>', methods=['Get'])
def get_all_products_by_Id(id):

    productos_query = Producto.query.filter_by(productor_id=id).all()
    #productos_query = Producto.query.filter_by(id=id).first()
    #productos_query = Producto.query.all()
    #productos_query = Producto.query.count()
    #productos_query = Producto.query.filter_by(nombre="Tomate").all()
    results = list(map(lambda item: item.serialize(), productos_query))
    #results = productos_query
    response_body = {
       "results": results
    }

    return jsonify(response_body), 200


# crear usuario

@api.route('/registro', methods=['POST'])
def add_user():

    request_body = request.get_json(force=True)
    # for x in request_body:
    #     item = User(username=x['username'],
    #                 password=x['password'],
    #                 email=x['email'])
    #     db.session.add(item)
    # db.session.commit()

    item = User(username=request_body['username'],
                password=request_body['password'],
                email=request_body['email'])
    db.session.add(item)
    db.session.commit()



    response_body = {
        'msg': 'ok',
        "results": ['Usuario Created', item.serialize()]
    }

    return jsonify(response_body), 200



@api.route('/users', methods=['POST'])

def create_user():

    request_body = request.get_json(force=True)

    user = User(email=request_body['email'],
                password=request_body['password'])
    
    if request_body['email'] is None or request_body['password'] is None:
        return jsonify ({
            'msg':'missing parameters (email, password, are required)'
        }), 400


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

@api.route('/perfil_productor_home', methods=['POST'])
def get_all_productores():
    request_body = request.get_json(force=True)

    Productor_query = PerfilProductor.query

    if request_body['selectedOptions'] and request_body['selectedOptions']['Producto']:
        product_name = request_body['selectedOptions']['Producto']
        Productor_query = Productor_query.filter(PerfilProductor.producto.any(nombre=product_name))

    if request_body['selectedCommunity'] and request_body['selectedCommunity']:
        community_name = request_body['selectedCommunity']
        Productor_query = Productor_query.filter(PerfilProductor.comunidad_autonoma == community_name)
    
    if request_body['selectedProvince'] and request_body['selectedProvince']:
        province_name = request_body['selectedProvince']
        Productor_query = Productor_query.filter(PerfilProductor.provincia == province_name)

    results = list(map(lambda item: item.serialize(), Productor_query))

    response_body = {
        "results": results
    }

    return jsonify(response_body), 200

# -------------------- CREAR PERFIL PRODUCTOR --------------------

@api.route('/perfil_productor', methods=['POST'])
def add_productor():

    request_body = request.get_json(force=True)


    #making an instance of Nominatim class
    print(request_body)
    geolocator = Nominatim(user_agent="delahuerta_request")
    loc_list = [request_body['direccion'],request_body['provincia'],request_body['comunidad_autonoma'], request_body['codigo_postal']]
    loc =  ','.join(loc_list)
    location = geolocator.geocode(loc)
    print("ok")

    productor = PerfilProductor(
        nombre= request_body['nombre'],
        apellido= request_body['apellido'],
        direccion= request_body['direccion'],
        telefono= request_body['telefono'],
        codigo_postal= request_body['codigo_postal'],
        comunidad_autonoma= request_body['comunidad_autonoma'],
        provincia= request_body['provincia'],
        nombre_huerta= request_body['nombre_huerta'],     
        problemas= request_body['problemas'],
        donde_encontrar= request_body['donde_encontrar'],
        descripcion= request_body['descripcion'],
        user_id=request_body['user_id'],
        latitud = location.latitude,
        longitud =location.longitude
          )
    


    db.session.add(productor)
    db.session.commit()


    response_body = {
        'msg':'ok',
        #"address":loc,
        "results": ['Productor Created', productor.serialize()]
    }

    return jsonify(response_body), 200

# --------------- OBTENER TODOS LOS PRODUCTORES ------


@api.route('/crear_perfil/', methods=['GET'])
def get_all_perfiles_productor():

    perfil_query = PerfilProductor.query.all()
    results = list(map(lambda item: item.serialize(), perfil_query))
    print(perfil_query)
    print(results)

    response_body = {
        "message": "ok",
        "results": results

    }

    return jsonify(response_body), 200

# --------------- OBTENER UN PRODUCTOR ---------------------

@api.route('/perfil/<int:user_id>', methods=['GET'])
def get_one_productor(user_id):

    user_query = PerfilProductor.query.filter_by(id=user_id).first()

    response_body = {
        "message": "ok",
        "result": user_query.serialize()

    }

    return jsonify(response_body), 200


# -------------------- LOGIN --------------------

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    # if user is None:
    if user != user.email:
        return jsonify({"msg": "email do not exist"}), 404

    if password != user.password:
        return jsonify({"msg": "Bad password"}), 401
    
    print(user.serialize())
    access_token = create_access_token(identity=email)
    return jsonify({"access_token":access_token, "user_id":user.id, "productor":user.serialize()["productor"], "info_productor":user.serialize()["info_productor"]})
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

# -------------------- VALIDATE--------------------

@api.route("/validate", methods=["GET"])
@jwt_required()
def check_valid():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if user is None:
        return False
    return True

