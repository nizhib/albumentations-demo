FROM ubuntu:18.04

LABEL maintainer="Evgeny Nizhibitsky <nizhib@github.com>"

# Install ubuntu packages

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        libaec-dev \
        libblosc-dev \
        libbrotli-dev \
        libbz2-dev \
        libgif-dev \
        libglib2.0-0 \
        libjxr-dev \
        liblcms2-dev \
        liblzma-dev \
        liblz4-dev \
        libopenjp2-7-dev \
        libpng-dev \
        libsnappy-dev \
        libtiff-dev \
        libturbojpeg0-dev \
        python3-dev \
        python3-pip \
        python3-setuptools \
        python3-wheel && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install python packages

RUN pip3 --no-cache-dir install -U pip

COPY requirements.txt .
RUN pip3 --no-cache-dir install -r requirements.txt

# Copy project files

COPY . .

# Run the service

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
CMD python3 -u app.py
