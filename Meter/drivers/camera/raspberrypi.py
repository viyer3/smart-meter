from picamera import PiCamera
from picamera.array import PiRGBArray
from PIL import Image

class Camera:
    __instance__ = None
    
    def getInstance():
        if Camera.__instance__ is not None:
            return Camera.__instance__
        return Camera()
    
    def __init__(self):
        if Camera.__instance__ != None:
            raise Exception("A camera instance has already been defined (Singleton Class)")
        self.driver     = "camera"
        self.sys        = "raspberrypi"
        self.camera     = PiCamera() 
        self.frame      = None
        self.image      = None
        
        Camera.__instance__ = self
        
    #Prepares frame, takes image, returns PIL.Image
    #flatten will 
    def capture(self, flatten = True):
        self.prepare_frame()
        self.camera.capture(self.frame, format = 'bgr')
        self.prepare_image()
        return self.image
    
    def get_image(self):
        return self.image
        
    def prepare_frame(self):
        self.frame = PiRGBArray(self.camera)
        
    def prepare_image(self):
        if self.frame is not None:
            self.image = Image.fromarray(self.frame.array)
        
    def __del__(self):
        self.camera.close()
        Camera.__instance__ = None
    