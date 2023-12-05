const { response, request } = require("express");
const body = request.body;
const Usuarios=require("../models/usuarios")

const usuariosGet=async(req, res=response)=> {
  const {nombre}=req.body;
  const usuarioEncontrado =await Usuarios.findOne({ nombre:nombre });
    res.json({
        msg: 'get API-controlador',
        usuario: usuarioEncontrado
    })
  };
  const usuariosPut=async(req, res=response)=> {
    const { nombre } = req.body;
    const camposAActualizar = req.body;

    if (camposAActualizar !== null && typeof camposAActualizar === 'object') {
      const usuarioActualizado = await Usuarios.findOneAndUpdate(
          { nombre: nombre },
          { $set: camposAActualizar },
          { new: true }
      );
    res.json({
        msg: 'put API-controlador',
        usuario: usuarioActualizado
    })
    }
  };
  
  const usuariosDelete=async(req, res=response)=> {
    const {body}=req.body;
    await Usuarios.deleteOne({ _body:body });
    res.json({
        msg: 'delete API-controlador',
        body
    })
  };
  const usuariosPost=async(req, res=response)=> {
    const usuario=new Usuarios(req.body);
    const {body}=req.body;
    await usuario.save();
    res.json({
        msg: 'post API-controlador',
        body
    })
  };
  const usuariosPatch=async(req, res=response)=> {
    const { nombre } = req.body;
    const camposAActualizar = req.body;
    if (camposAActualizar !== null && typeof camposAActualizar === 'object') {
      // Utilizar findOneAndUpdate para realizar cambios parciales en un recurso por su nombre
      const usuarioActualizado = await Usuarios.findOneAndUpdate(
          { nombre: nombre },
          { $set: camposAActualizar },
          { new: true }
      );
    res.json({
        msg: 'patch API-controlador',
        usuario: usuarioActualizado
    })
  }
  };

  module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosPost
  }