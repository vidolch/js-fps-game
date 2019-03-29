class Unpacked {
    verts: number[] = [];
    norms: number[] = [];
    textures: number[] = [];
    hashindices: object = {};
    indices: number[] = [];
    index: number = 0;
}

export class ParsedObject {
    vertices: number[];
    vertexNormals: number[];
    textures: number[];
    indices: number[];
}

export class ObjectLoader {
    static load(objectData: string): ParsedObject {
        let verts: number[] = [];
        let vertNormals: number[] = [];
        let textures: number[] = [];
        let unpacked: Unpacked = new Unpacked();

        // array of lines separated by the newline
        let lines: string[] = objectData.split("\n");

        const VERTEX_RE: RegExp = /^v\s/;
        const NORMAL_RE: RegExp = /^vn\s/;
        const TEXTURE_RE: RegExp = /^vt\s/;
        const FACE_RE: RegExp = /^f\s/;
        const WHITESPACE_RE: RegExp = /\s+/;

        for (let i: number = 0; i < lines.length; i++) {
            let line: string = lines[i].trim();
            let elements: string[] = line.split(WHITESPACE_RE);
            elements.shift();

            if (VERTEX_RE.test(line)) {
                // if this is a vertex
                verts.push.apply(verts, elements);
            } else if (NORMAL_RE.test(line)) {
                // if this is a vertex normal
                vertNormals.push.apply(vertNormals, elements);
            } else if (TEXTURE_RE.test(line)) {
                // if this is a texture
                textures.push.apply(textures, elements);
            } else if (FACE_RE.test(line)) {
                let quad: boolean = false;
                for (var j: number = 0, eleLen: number = elements.length; j < eleLen; j++) {
                    // triangulating quads
                    // quad: 'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2 v3/t3/vn3/'
                    // corresponding triangles:
                    //      'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2'
                    //      'f v2/t2/vn2 v3/t3/vn3 v0/t0/vn0'
                    if (j === 3 && !quad) {
                        // add v2/t2/vn2 in again before continuing to 3
                        j = 2;
                        quad = true;
                    }
                    if (elements[j] in unpacked.hashindices) {
                        unpacked.indices.push(unpacked.hashindices[elements[j]]);
                    } else {
                        /*
                        Each element of the face line array is a vertex which has its
                        attributes delimited by a forward slash. This will separate
                        each attribute into another array:
                            '19/92/11'
                        becomes:
                            vertex = ['19', '92', '11'];
                        where
                            vertex[0] is the vertex index
                            vertex[1] is the texture index
                            vertex[2] is the normal index
                         Think of faces having Vertices which are comprised of the
                         attributes location (v), texture (vt), and normal (vn).
                         */
                        let vertex: number[] = elements[j].split("/").map(n => parseFloat(n));
                        /*
                         The verts, textures, and vertNormals arrays each contain a
                         flattend array of coordinates.
                         Because it gets confusing by referring to vertex and then
                         vertex (both are different in my descriptions) I will explain
                         what's going on using the vertexNormals array:
                         vertex[2] will contain the one-based index of the vertexNormals
                         section (vn). One is subtracted from this index number to play
                         nice with javascript's zero-based array indexing.
                         Because vertexNormal is a flattened array of x, y, z values,
                         simple pointer arithmetic is used to skip to the start of the
                         vertexNormal, then the offset is added to get the correct
                         component: +0 is x, +1 is y, +2 is z.
                         This same process is repeated for verts and textures.
                         */
                        // vertex position
                        unpacked.verts.push(verts[(vertex[0] - 1) * 3 + 0]);
                        unpacked.verts.push(verts[(vertex[0] - 1) * 3 + 1]);
                        unpacked.verts.push(verts[(vertex[0] - 1) * 3 + 2]);
                        // vertex textures
                        unpacked.textures.push(textures[(vertex[1] - 1) * 2 + 0]);
                        unpacked.textures.push(textures[(vertex[1] - 1) * 2 + 1]);
                        // vertex normals
                        unpacked.norms.push(vertNormals[(vertex[2] - 1) * 3 + 0]);
                        unpacked.norms.push(vertNormals[(vertex[2] - 1) * 3 + 1]);
                        unpacked.norms.push(vertNormals[(vertex[2] - 1) * 3 + 2]);
                        // add the newly created vertex to the list of indices
                        unpacked.hashindices[elements[j]] = unpacked.index;
                        unpacked.indices.push(unpacked.index);
                        // increment the counter
                        unpacked.index += 1;
                    }
                    if (j === 3 && quad) {
                        // add v0/t0/vn0 onto the second triangle
                        unpacked.indices.push(unpacked.hashindices[elements[0]]);
                    }
                }
            }
        }

        return {
            vertices: unpacked.verts,
            vertexNormals: unpacked.norms,
            textures: unpacked.textures,
            indices: unpacked.indices,
        };
    }
}