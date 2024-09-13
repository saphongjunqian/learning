# English Dictation

## Folder 

|Folder|Content|
|-|-|
|app|Folder contains Fiori apps|
|db|Folder for DB schema|
|srv|Folder for Service|
|webapp|Folder for web apps|

## Deploy Steps

There are two deploy steps.

1. Deploy the Service and Fiori Elements app

```
npm run build
npm run deploy
```

2. Deploy the Webapp

The following command works on Windows platform.

```
cd webapp
.\deploy.ps1
```
