#!/usr/bin/env python3

import base64
import io
import sys
import time
from http import HTTPStatus

import cv2
from imageio import imread, imsave
from flask import Flask, request, jsonify
from flask_cors import CORS
from waitress import serve

import albumentations as A


app = Flask(__name__)
CORS(app)


def base64ify(image):
    fmem = io.BytesIO()
    imsave(fmem, image, 'png')
    fmem.seek(0)
    return base64.b64encode(fmem.read()).decode('utf-8')


@app.route('/albumentize', methods=['POST'])
def albumentize():
    start = time.time()
    status = HTTPStatus.OK
    response = {'success': False}

    data = request.json

    image = data.get('image')
    if image is None:
        response['message'] = 'image not found in the request'
        response['total'] = time.time() - start
        status = HTTPStatus.BAD_REQUEST
        jsonify(response), status

    repeats = int(data.get('repeats', 1))
    albumentations = data.get('albumentations', [])

    print(repeats, 'x', albumentations)

    image = imread(io.BytesIO(base64.b64decode(image)))
    image = cv2.resize(image, (512, 512), cv2.INTER_AREA)

    transform = A.Compose([
        getattr(A, albumentation)()
        for albumentation in albumentations
    ])

    albumentized = [
        base64ify(transform(image=image)['image'])
        for _ in range(repeats)
    ]

    response['data'] = {
        'albumentized': albumentized
    }
    response['success'] = True
    response['total'] = time.time() - start

    return jsonify(response), status


def main():
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    else:
        port = 5000

    serve(app, host='0.0.0.0', port=port)


if __name__ == '__main__':
    main()
