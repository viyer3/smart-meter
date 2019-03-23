#import keras
#from keras.application import vgg16

from PIL import Image
import pytesseract, cv2

def test(s):
    img = Image.open(s)
    return pytesseract.image_to_string(s)

def testrun():
    return test('license.jpg')

def processImage(s):
    img = Image.open(s)
    w, h = img.size
