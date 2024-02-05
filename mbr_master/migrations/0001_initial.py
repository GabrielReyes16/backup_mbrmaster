
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Unidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='users',
            fields=[
                ('iduser', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=45, unique=True)),
                ('password', models.CharField(max_length=45)),
                ('first_name', models.CharField(blank=True, max_length=45, null=True)),
                ('last_name', models.CharField(blank=True, max_length=45, null=True)),
                ('photo', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'users',
            },
        ),
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('unidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mbr_master.unidad')),
            ],
        ),
    ]
