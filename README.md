# product highlight

This api is used to create highlight for products

## Create Highlight

### Request

```js
const axios = require("axios");
let data = JSON.stringify({
  title: "catt",
  description: "this",
  imgUrl:
    "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
});

let config = {
  method: "post",
  url: "https://udizfftsmcgvomltkxyr.supabase.co/functions/v1/highlights",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
```

### Response

    { "imgUrl":"https://udizfftsmcgvomltkxyr.supabase.co/storage/v1/object/public/images/product-images/uuid.png", title: "uuid"}

## Delete Highlight

### Request

```js
const axios = require("axios");

let config = {
  method: "get",
  url: "https://udizfftsmcgvomltkxyr.supabase.co/functions/v1/delete-highlight?title=uuid",
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
```

### Response

    { "status":"deleted" }
