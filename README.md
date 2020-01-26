# Comand to start mongo in development

> Linux working

```sh
sudo docker run --network host mongo
```

# COmmand to create a sqs container

> Linux working

```sh
sudo docker run --name sqs -p 9324:9324 -p 9325:9325 roribio16/alpine-sqs
```
