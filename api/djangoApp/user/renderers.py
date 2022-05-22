import json

from rest_framework.renderers import JSONRenderer


class UserJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, media_type=None, renderer_context=None):
        validation_err = data.get('non_field_errors', None)
        token = data.get('token', None)

        if token is not None and isinstance(token, bytes):
            data['token'] = token.decode('utf-8')

        if validation_err is not None:
            return json.dumps({
                'errors': validation_err
            })

        return json.dumps({
            'user': data
        })