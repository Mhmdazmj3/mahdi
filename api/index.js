const _0x1d4db8 = _0x1876;

(function (_0x550634, _0x41f58a) {
  const _0x2da371 = _0x1876,
    _0x430ea4 = _0x550634();

  while (!![]) {
    try {
      const _0xfd1d3c =
        -parseInt(_0x2da371(0xc0)) / 0x1 +
        -parseInt(_0x2da371(0xce)) / 0x2 +
        -parseInt(_0x2da371(0xc3)) / 0x3 +
        parseInt(_0x2da371(0xc2)) / 0x4 +
        parseInt(_0x2da371(0xbb)) / 0x5 *
          (-parseInt(_0x2da371(0xd6)) / 0x6) +
        -parseInt(_0x2da371(0xd3)) / 0x7 *
          (-parseInt(_0x2da371(0xc9)) / 0x8) +
        parseInt(_0x2da371(0xb8)) / 0x9 *
          (parseInt(_0x2da371(0xcc)) / 0xa);

      if (_0xfd1d3c === _0x41f58a) break;
      else _0x430ea4.push(_0x430ea4.shift());
    } catch (_0x25556b) {
      _0x430ea4.push(_0x430ea4.shift());
    }
  }
})(_0x4272, 0xc4752);

export const config = {
  runtime: 'edge'
};

const _0x1b0fdb = (process.env.WJHK2HH354Q8 || '').replace(/\/$/, '');

const _0x55c52c = new Set([
  'host',
  'connection',
  'proxy-authorization',
  'proxy-authenticate',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'keep-alive',
  'x-forwarded-for',
  'x-real-ip',
  'x-forwarded-proto',
  'x-forwarded-host',
  'x-forwarded-port'
]);

async function _0x361ef2(_0x277c07) {
  const _0x4ae1bb = _0x1d4db8;

  if (!_0x1b0fdb)
    return new Response('Service error', { status: 0x1f4 });

  try {
    const _0x3ba291 = _0x277c07.url.indexOf('/', 0x8);
    const _0x315181 =
      _0x3ba291 === -0x1
        ? _0x1b0fdb + '/'
        : _0x1b0fdb + _0x277c07.url.slice(_0x3ba291);

    const _0x148896 = new Headers();
    let _0x9123f9 = null;

    for (const [_0xdfe74b, _0x4b6ca5] of _0x277c07.headers) {
      if (_0x55c52c.has(_0xdfe74b.toLowerCase())) continue;
      if (_0xdfe74b.startsWith('x-vercel-')) continue;

      if (_0xdfe74b === 'x-forwarded-for') {
        _0x9123f9 = _0x4b6ca5;
        continue;
      }

      if (_0xdfe74b === 'x-real-ip') {
        if (!_0x9123f9) _0x9123f9 = _0x4b6ca5;
        continue;
      }

      _0x148896.set(_0xdfe74b, _0x4b6ca5);
    }

    if (_0x9123f9) {
      _0x148896.set('x-forwarded-for', _0x9123f9);
    }

    const _0x4258b1 = _0x277c07.method;
    const _0x223541 = _0x4258b1 !== 'GET' && _0x4258b1 !== 'HEAD';

    return await fetch(_0x315181, {
      method: _0x4258b1,
      headers: _0x148896,
      body: _0x223541 ? _0x277c07.body : undefined,
      duplex: 'half',
      redirect: 'manual'
    });
  } catch (_0x45a69c) {
    return new Response('Service unavailable', { status: 0x1f6 });
  }
}

export default _0x361ef2;

function _0x1876(_0x30d680, _0x3c0cb5) {
  _0x30d680 = _0x30d680 - 0xb7;
  const _0x427216 = _0x4272();
  return _0x427216[_0x30d680];
}

function _0x4272() {
  const _0xa8c68d = [
    'method',
    '739540RIZLER',
    'startsWith',
    '584128DZteMc',
    '1992444OPBIPU',
    'x-forwarded-for',
    'edge',
    'x-forwarded-proto',
    'replace',
    'has',
    '110504uyhPml',
    'forwarded',
    'headers',
    '10EFUdCX',
    'upgrade',
    '1292172KTxStd',
    'x-forwarded-host',
    'manual',
    'keep-alive',
    'x-real-ip',
    '119ziWUiW',
    'proxy-authorization',
    'x-forwarded-port',
    '8685486IaVoei',
    'Service error',
    '35290728peXBtw',
    'Service unavailable',
    'set',
    '5oeffEV',
    'GET',
    'connection',
    'url'
  ];

  _0x4272 = function () {
    return _0xa8c68d;
  };

  return _0x4272();
}
