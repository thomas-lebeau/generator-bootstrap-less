import os
import sys
import shutil

# Script to install the generator.
# Copied from https://github.com/romainberger/yeoman-wordpress/

def which(program):
    import os
    def is_exe(fpath):
        return os.path.isfile(fpath) and os.access(fpath, os.X_OK)

    fpath, fname = os.path.split(program)
    if fpath:
        if is_exe(program):
            return program
    else:
        for path in os.environ["PATH"].split(os.pathsep):
            path = path.strip('"')
            exe_file = os.path.join(path, program)
            if is_exe(exe_file):
                return exe_file

    return None

yeomanBinaryPath = yeomanInstalled = which('yeoman')

# Check if Yeoman is installed
if not yeomanInstalled:
    print 'It seems that Yeoman is not installed.'
    print 'If you have trouble installing the generator please refer to the install instructions in the Readme.'
    sys.exit(1)

yeomanPrefix = os.path.normpath(os.path.join(yeomanBinaryPath, '../../'))
generatorPath = os.path.join(yeomanPrefix, 'lib/node_modules/yeoman/node_modules/yeoman-generators/lib/generators')
currentDir = os.path.dirname(os.path.abspath(__file__))
bootstrapLessPath = os.path.join(generatorPath, 'bootstrap-less')

# if the generator is already installed we remove it to avoid errors
if os.path.isdir(bootstrapLessPath):
    shutil.rmtree(bootstrapLessPath)
try:
    shutil.copytree(currentDir, bootstrapLessPath)
    print '\033[32mGenerator installed successfully.\033[37m\n'
except:
    print 'Oops, something went wrong, sorry'
    print 'If you have trouble installing the generator please refer to the install install instructions in the Readme.'
    raise
