package com.app.restservice;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import com.google.gson.JsonObject;

@Path("/status")
public class Status {
	
	@GET
	@Produces({"application/json", "application/javascript"})
	public Response test(@PathParam("id") Long id, @QueryParam("detailed") boolean detailed)
			 {
		JsonObject o = new JsonObject();
		o.addProperty("aa", "a");
		return Response.ok() //200
				.entity(o.toString())
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.allow("OPTIONS").build();
	}
	
	@Path("/test2")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String test2()
	{
		return "<h1> test 2 <h1>";
	}
	
	
}
