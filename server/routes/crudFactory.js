// Builds a standard CRUD route set for a Mongoose model.
//
//   GET    /            -> list all (public, sorted by order then newest)
//   GET    /:id         -> get one (public)
//   POST   /            -> create (admin only)
//   PUT    /:id         -> update (admin only)
//   DELETE /:id         -> delete (admin only)
//
// Public reads so the portfolio can render; writes require a valid JWT.

export function crudRoutes(Model) {
  return async function (fastify) {
    const requireAuth = { onRequest: [fastify.authenticate] };

    fastify.get("/", async () => {
      return Model.find().sort({ order: 1, createdAt: -1 }).lean();
    });

    fastify.get("/:id", async (request, reply) => {
      const doc = await Model.findById(request.params.id).lean();
      if (!doc) return reply.code(404).send({ error: "Not found" });
      return doc;
    });

    fastify.post("/", requireAuth, async (request, reply) => {
      try {
        const doc = await Model.create(request.body || {});
        return reply.code(201).send(doc);
      } catch (err) {
        return reply.code(400).send({ error: err.message });
      }
    });

    fastify.put("/:id", requireAuth, async (request, reply) => {
      try {
        const doc = await Model.findByIdAndUpdate(
          request.params.id,
          request.body || {},
          { new: true, runValidators: true }
        );
        if (!doc) return reply.code(404).send({ error: "Not found" });
        return doc;
      } catch (err) {
        return reply.code(400).send({ error: err.message });
      }
    });

    fastify.delete("/:id", requireAuth, async (request, reply) => {
      const doc = await Model.findByIdAndDelete(request.params.id);
      if (!doc) return reply.code(404).send({ error: "Not found" });
      return { success: true, id: request.params.id };
    });
  };
}
