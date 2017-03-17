
from setuptools import setup, find_packages

setup (
	name='dellve_alexnet',
	version='0.0.1',
	packages=find_packages(),
	install_requires=['dellve'],
	entry_points='''
	[dellve.benchmarks]
	AlexNetBenchmark=dellve_alexnet:AlexNetBenchmark
	'''
)