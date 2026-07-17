import Benchmark from 'benchmark';
import { hash } from '../src/index.js';

const suite = new Benchmark.Suite();

suite
  .add('IronPass hash()', {
    defer: true,
    fn: async (deferred) => {
      await hash('testPassword123');
      deferred.resolve();
    },
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
