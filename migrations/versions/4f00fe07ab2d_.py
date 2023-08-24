"""empty message

<<<<<<<< HEAD:migrations/versions/134be8c3b7c6_.py
Revision ID: 134be8c3b7c6
Revises: 
Create Date: 2023-08-24 15:44:54.846994
========
Revision ID: 4f00fe07ab2d
Revises: 
Create Date: 2023-08-24 13:56:00.447187
>>>>>>>> 4469c61c630376d5789976a917f01a187fcd4fce:migrations/versions/4f00fe07ab2d_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/134be8c3b7c6_.py
revision = '134be8c3b7c6'
========
revision = '4f00fe07ab2d'
>>>>>>>> 4469c61c630376d5789976a917f01a187fcd4fce:migrations/versions/4f00fe07ab2d_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comunidades_autonomas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('productoNombres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('provincias',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('comunidad_autonoma_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['comunidad_autonoma_id'], ['comunidades_autonomas.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=20), nullable=False),
    sa.Column('apellido', sa.String(length=50), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('direccion', sa.String(length=120), nullable=False),
    sa.Column('telefono', sa.Integer(), nullable=False),
    sa.Column('codigo_postal', sa.Integer(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('comunidad_autonoma_id', sa.Integer(), nullable=False),
    sa.Column('provincia_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['comunidad_autonoma_id'], ['comunidades_autonomas.id'], ),
    sa.ForeignKeyConstraint(['provincia_id'], ['provincias.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('telefono')
    )
    op.create_table('perfil_productores',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('nombre_huerta', sa.String(length=250), nullable=True),
    sa.Column('foto_portada', sa.String(length=250), nullable=True),
    sa.Column('foto_perfil', sa.String(length=250), nullable=True),
    sa.Column('problemas', sa.String(length=250), nullable=True),
    sa.Column('donde_encontrar', sa.String(length=250), nullable=True),
    sa.Column('latitud', sa.Float(), nullable=True),
    sa.Column('longitud', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('productos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('productor_id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=250), nullable=True),
    sa.Column('variedad', sa.String(length=250), nullable=True),
    sa.Column('cantidad', sa.Integer(), nullable=True),
    sa.Column('unidad_medida', sa.String(length=250), nullable=True),
    sa.Column('precio', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['productor_id'], ['perfil_productores.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('productos')
    op.drop_table('perfil_productores')
    op.drop_table('users')
    op.drop_table('provincias')
    op.drop_table('productoNombres')
    op.drop_table('comunidades_autonomas')
    # ### end Alembic commands ###