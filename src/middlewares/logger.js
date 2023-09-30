export function requestLogger(request, response, next) {
  console.log('------');
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  // console.log('Headers:  ', request.headers);
  console.log('Body:  ', request.body);
  console.log('------');
  next();
}
