import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { serializeDoc, serializeDocs, generateId } from '../src/lib/mongodb.ts';

describe('MongoDB Utility & Serialization Tests', () => {
  test('generateId returns valid UUID string', () => {
    const id1 = generateId();
    const id2 = generateId();
    assert.equal(typeof id1, 'string');
    assert.ok(id1.length >= 32);
    assert.notEqual(id1, id2);
  });

  test('serializeDoc maps _id to id and preserves document fields', () => {
    const raw = {
      _id: { toString: () => '64a1b2c3d4e5f67890123456' },
      title: 'LincPay Fintech Portal',
      featured: true,
    };
    const serialized = serializeDoc(raw);
    assert.equal(serialized.id, '64a1b2c3d4e5f67890123456');
    assert.equal(serialized._id, undefined);
    assert.equal(serialized.title, 'LincPay Fintech Portal');
    assert.equal(serialized.featured, true);
  });

  test('serializeDoc preserves existing id if present', () => {
    const raw = {
      id: 'custom-proj-id-123',
      title: 'Role-Based CRM',
    };
    const serialized = serializeDoc(raw);
    assert.equal(serialized.id, 'custom-proj-id-123');
    assert.equal(serialized.title, 'Role-Based CRM');
  });

  test('serializeDocs correctly transforms list of documents', () => {
    const list = [
      { id: '1', title: 'Service 1' },
      { _id: { toString: () => 'mongo-id-2' }, title: 'Service 2' },
    ];
    const result = serializeDocs(list);
    assert.equal(result.length, 2);
    assert.equal(result[0].id, '1');
    assert.equal(result[1].id, 'mongo-id-2');
  });

  test('serializeDoc returns falsy inputs as-is', () => {
    assert.equal(serializeDoc(null), null);
    assert.equal(serializeDoc(undefined), undefined);
  });
});
