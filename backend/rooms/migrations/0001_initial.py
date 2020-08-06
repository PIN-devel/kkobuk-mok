# Generated by Django 2.1.15 on 2020-08-06 02:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100, null=True)),
                ('description', models.CharField(max_length=300)),
                ('member_num', models.IntegerField(default=1)),
            ],
        ),
    ]
