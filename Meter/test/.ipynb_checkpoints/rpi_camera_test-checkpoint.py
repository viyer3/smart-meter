import numpy as np
from PIL import Image
#import cv2
from picamera import PiCamera
from picamera.array import PiRGBArray

camera = PiCamera()

while(True):
	frame = PiRGBArray(camera)
	camera.capture(frame, format = 'bgr')
	imageArray = frame.array

	image = Image.fromarray(imageArray, 'RGB')
	image.resize((300,300))
	image.show()

	#res = cv2.resize(imageArray, dsize=(300, 300), interpolation=cv2.INTER_CUBIC)
	#cv2.imshow("img", res)
	#if cv2.waitKey(1) & 0xFF == ord('q'):
	#	break
