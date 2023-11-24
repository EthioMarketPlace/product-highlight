# product highlight

this api is used to create highlight for products

## Create Highlight

### Request

```js
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://udizfftsmcgvomltkxyr.supabase.co/functions/v1/highlights?title=Cat&imgUrl=https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg&description=this cat is not for sell&size=small and cute&price=1000',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

### Response
    { "imgUrl":"https://udizfftsmcgvomltkxyr.supabase.co/storage/v1/object/public/images/product-images/Cat.png" }
    
