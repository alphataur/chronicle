function successify(res, payload){
  return res.json({
    success: true,
    error: false,
    ...payload
  })
}

function errorify(res, error){
  res.status(500)
  return res.json({
    success: false,
    error
  })
}

module.exports = {
  successify,
  errorify
}
