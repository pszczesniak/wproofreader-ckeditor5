import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Command from '@ckeditor/ckeditor5-core/src/command';
import WProofreader from '../src/wproofreader';
import WProofreaderSettingsCommand from '../src/wproofreadersettingscommand';

describe('WProofreaderSettingsCommand', () => {
	let element, testEditor, wproofreader, wproofreaderSettings;
	const WPROOFREADER_CONFIG = {
		serviceProtocol: 'http',
		serviceHost: 'localhost',
		servicePort: '2880',
		servicePath: '/',
		srcUrl: 'http://localhost:3000/tests/mocks/mock-wscbundle.js'
	};

	beforeEach(() => {
		element = document.createElement('div');
		document.body.appendChild(element);

		return ClassicEditor
			.create(element, {
				plugins: [WProofreader],
				wproofreader: WPROOFREADER_CONFIG
			})
			.then((editor) => {
				testEditor = editor;
				wproofreader = testEditor.plugins.get('WProofreader');
				wproofreaderSettings = testEditor.commands.get('WProofreaderSettings');
			});
	});

	afterEach(() => {
		element.remove();
		wproofreader = null;
		wproofreaderSettings = null;

		return testEditor.destroy();
	});

	it('should be a command', () => {
		expect(WProofreaderSettingsCommand.prototype).to.be.instanceOf(Command);
		expect(wproofreaderSettings).to.be.instanceOf(Command);
	});

	it('should open the WEBSPELLCHECKER settings', () => {
		const spy = sinon.spy(wproofreader, 'openSettings');

		testEditor.execute('WProofreaderSettings');

		sinon.assert.calledOnce(spy);
	});
});
