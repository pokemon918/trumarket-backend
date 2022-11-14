# Resources Permissions

## Public
listing or getting the single document of the resources like (products, categories, articles, keywords) is publicly accessible.

## Admin-Permission-Only
creating, updating, uploading, and deleting resources (like products, categories, articles, keywords) are an admin-permission-only.

You can't upgrade the user to `admin` by the Restful/Graphql APIs. To do so you have to:

1. Connect to the mongodb database via the Shell or [MongoDB Compass](https://www.mongodb.com/products/compass) using the uri of `MONGO_URI` (in the `.env` file)
2. Go to the `users` collection
3. Select the `user` you want to upgrade to admin. then change its `role` to `"admin"`.
