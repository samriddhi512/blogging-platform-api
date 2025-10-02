import { ResultSetHeader, RowDataPacket } from "mysql2";
import catchAsync from "../utils/catchAsync";
import { withTransaction } from "../utils/withTransaction";
import { db } from "../db";
import { HTTP_CODE } from "../constants/httpCodes";
import { STATUS } from "../constants/status";
import { CustomError } from "../utils/customError";

export const createNewPost = catchAsync(async (req, res, next) => {
  const { title, content, category, tags } = req.body;

  const insertId = await withTransaction(async (conn) => {
    const [result] = await conn.execute<ResultSetHeader>(
      "insert into blogs (title, content, category, tags) value (?, ?, ?, ?)",
      [title, content, category, JSON.stringify(tags)]
    );
    return result.insertId;
  });
  return res.status(HTTP_CODE.CREATED).json({
    status: STATUS.SUCCESS,
    data: {
      id: insertId,
    },
  });
});

export const getAllPosts = catchAsync(async (req, res, next) => {
  const [result] = await db.execute<RowDataPacket[]>("select * from blogs");

  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    data: {
      result,
    },
  });
});

export const getPostById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const [result] = await db.execute<RowDataPacket[]>(
    "select * from blogs where id = ?",
    [id]
  );

  if (!result.length) {
    return next(
      new CustomError({
        message: "No blog found with this ID",
        statusCode: HTTP_CODE.NOT_FOUND,
      })
    );
  }

  res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    data: {
      result: result[0],
    },
  });
});

export const updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title = "", content = "", category = "", tags = [] } = req.body;

  const affectedRows = await withTransaction(async (conn) => {
    const [result] = await conn.execute<ResultSetHeader>(
      "update blogs set title = ?, content = ?, category = ?, tags = ? where id = ?",
      [title, content, category, JSON.stringify(tags), id]
    );
    return result.affectedRows;
  });

  if (affectedRows === 0) {
    return next(
      new CustomError({
        message: "No blog found with this ID",
        statusCode: HTTP_CODE.NOT_FOUND,
      })
    );
  }

  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    result: {
      affectedRows,
    },
  });
});

export const updatePostPartially = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;

  const affectedRows = await withTransaction(async (conn) => {
    const [result1] = await conn.execute<RowDataPacket[]>(
      "Select * from blogs where id = ?",
      [id]
    );
    const existingRow = result1[0];
    const values = {
      title: title ?? existingRow.title,
      content: content ?? existingRow.content,
      category: category ?? existingRow.category,
      tags: (tags && JSON.stringify(tags)) ?? existingRow.tags,
    };
    const [result2] = await conn.execute<ResultSetHeader>(
      "update blogs set title = ?, content = ?, category = ?, tags = ? where id = ?",
      [values.title, values.content, values.category, values.tags, id]
    );

    return result2.affectedRows;
  });
  if (affectedRows === 0) {
    return next(
      new CustomError({
        message: "No blog found with this ID",
        statusCode: HTTP_CODE.NOT_FOUND,
      })
    );
  }
  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    result: {
      affectedRows,
    },
  });
});

export const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const affectedRows = await withTransaction(async (conn) => {
    const [result] = await conn.execute<ResultSetHeader>(
      "delete from blogs where id = ?",
      [id]
    );
    return result.affectedRows;
  });

  if (affectedRows === 0) {
    return next(
      new CustomError({
        message: "No blog found with this ID",
        statusCode: HTTP_CODE.NOT_FOUND,
      })
    );
  }
  return res.status(HTTP_CODE.NO_CONTENT).json({
    status: STATUS.SUCCESS,
  });
});
