BD Schema
===

answer schema:

```javascript
{
  uuid: {
    type: "string",
    primary: true
  },
  bedNo: {
    type: "string",
  },
  language: {
    type: "string",
  },
  answers: {
    type: "array",
  },
  createTime: {
    type: "date-time",
  }
}
```

user schema:

```
  uuid: {
    type: Schema.Types.String,
    primary: true,
  },
  account: {
    type: Schema.Types.String,
    require: true,
  },
  password: {
    type: Schema.Types.String,
    require: true,
  },
  createTime: {
    type: Schema.Types.Date,
    default: new Date()
  },
```
