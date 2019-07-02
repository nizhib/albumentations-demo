FROM ubuntu:18.04

LABEL maintainer="Evgeny Nizhibitsky <nizhib@github.com>"

# Install ubuntu packages

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libglib2.0-0 \
        python3-pip \
        python3-setuptools && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install python packages

COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy project files

COPY . .

# Run the service

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
CMD python3 -u app.py