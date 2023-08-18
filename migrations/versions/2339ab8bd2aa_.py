"""empty message

Revision ID: 2339ab8bd2aa
Revises: 
Create Date: 2023-08-18 10:29:57.158612

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2339ab8bd2aa'
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
    sa.Column('comunidad_autonoma_id', sa.Integer(), nullable=False),
    sa.Column('provincia_id', sa.Integer(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['comunidad_autonoma_id'], ['comunidades_autonomas.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('telefono')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('provincias')
    op.drop_table('comunidades_autonomas')
    # ### end Alembic commands ###
